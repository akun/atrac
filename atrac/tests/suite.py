#!/usr/bin/env python


import unittest

from atrac.tests.test_ticket import TicketTestCase

def suite():
    suite = unittest.TestSuite()
    suite.addTest(TicketTestCase)
    return suite
