import os
import yaml
import socket


class Page(object):

    def __init__(self, name, params, default_header, project_path):
        self.name = name
        self.params = params
        self.header = params.get("header", None)
        self.default_header = default_header
        self.project_path = project_path

    def get_header(self, key, default=None):
        value = self.default_header.get(key, default)
        if self.header is not None:
            value = self.header.get(key, value)
        return value

    def compile(self):
        # -- HEADER

        html = ""
        html += "<!DOCTYPE HTML>\n"
        html += "<HTML>\n\n"

        html += "<HEAD>\n"

        # base href
        if socket.getfqdn() == params["production_host"] or self.header is not None:
            base_href = self.get_header("base_url", ".")
        else:
            base_href = f"file://{project_path}/public_html/"
        html += f"<base href='{base_href}'>\n"

        # title and icon
        html += f"  <TITLE>{self.get_header('base_title')} {self.get_header('title', self.name)}</TITLE>\n"
        html += f"  <link type='image/x-icon' href='{self.get_header('icon')}' rel='page icon'>\n"

        # css
        css = self.get_header("css", {})
        for media in css:
            html += f"  <link rel='stylesheet' type='text/css' media='{media}' href='{css[media]}'>\n"

        # meta
        html += (
            "  <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>\n"
        )
        meta = self.get_header("meta")
        for name in meta:
            html += f"  <meta name='{name}' content='{meta[name]}'>\n"

        html += "</HEAD>\n\n"

        # -- BODY

        html += "<BODY>\n\n"

        # head
        filename = os.path.join(project_path, 'raw_html', self.get_header('template')['head'])
        with open(filename, 'r') as f:
            html += f.read()

        # menu

        # content

        # foot
        filename = os.path.join(project_path, 'raw_html', self.get_header('template')['foot'])
        with open(filename, 'r') as f:
            html += f.read()

        html += "</BODY>\n"
        html += "</HTML>\n\n"

        print(html)
        filename = os.path.join(project_path, 'public_html', self.params['file'])
        with open(filename, 'w') as f:
            f.write(html)

# -----------------------------------------------------------------------------

# Set up project path

project_path = os.path.abspath(os.path.join("examples", "astrophysics.ft.uam.es"))

# Read config file

config_file = "config.yaml"
with open(os.path.join(project_path, config_file), "r") as file:
    params = yaml.safe_load(file)

# Compile

for entry in params["menu"]:
    page = Page(entry, params["menu"][entry], params["default_header"], project_path)
    page.compile()
