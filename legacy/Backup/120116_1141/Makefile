#------------------------------------------------------

BAK_DIR = Backup/$(shell date "+%y%m%d_%H%M")
# BASE_DIR = $(PWD)/../..
BASE_DIR = $(PWD)/..

# OPTIONS = -O3 -Wall -Iinclude -DCOMMON_FILES=\"$(BASE_DIR)/web_admin/common_files/\"
OPTIONS = -O3 -Wall -Iinclude -DHOME_DIR=\"$(BASE_DIR)/\"
COMPILER = g++ $(OPTIONS)

LIBRARIES = -lm

#------------------------------------------------------
default: users
#------------------------------------------------------
	#-------------------------------------------#
	# yWeb                                      #
	#                                           #
	#           Yago Ascasibar (UAM, Fall 2011) #
	#-------------------------------------------#
	#                    ... Paranoy@ Rulz! ;^D


#------------------------------------------------------
admin:
#------------------------------------------------------
	$(COMPILER) -DHOME_DIR=\"$(BASE_DIR)/web_admin/\" -o $(BASE_DIR)/web_admin/yWeb_update src/admin.cpp $(LIBRARIES)
	../yWeb_update

#------------------------------------------------------
users:
#------------------------------------------------------
# 	$(COMPILER) -DMY_NAME=\""Yago Ascasibar"\" -DHOME_DIR=\"$(BASE_DIR)/yago/\" -o $(BASE_DIR)/yago/yWeb_update src/user.cpp $(LIBRARIES)
	$(COMPILER) -o bin/yWeb src/user.cpp $(LIBRARIES)
	./bin/yWeb $(USERNAME)

#------------------------------------------------------
clean:
#------------------------------------------------------
	rm -f $(HTML_DIR)/*.html *~ */*~ */*/*~ */*/*/*~


#------------------------------------------------------
backup:
#------------------------------------------------------
	mkdir $(BAK_DIR)
	cp -r Makefile include/ src/ $(BAK_DIR)
	
#------------------------------------------------------
#                              ... Paranoy@ Rulz! ;^D
#------------------------------------------------------
