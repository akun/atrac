#!/usr/bin/env python


import os
import sys


try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup


setup(
    name='atrac',
    version='0.0.1',
    description='A SCMS',
    author='akun',
    url='https://github.com/akun/atrac',
    packages=[
        'atrac',
    ],
    package_dir={'atrac': 'atrac'},
    install_requires=[
        'tornado==3.1.1',
        'mongokit==0.9.0',
    ],
    test_suite='atrac.tests.suite',
)
