#!/usr/bin/env python
import os
import sys
'''This script simply finds the settings and implements them'''
if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ctf.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
