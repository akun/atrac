#!/usr/bin/env python


from tornado.testing import AsyncHTTPTestCase
import tornado

from atrac.main import get_application


class TicketTestCase(AsyncHTTPTestCase):

    def get_app(self):
        return get_application()

    def test_ticket_create_get_success(self):
        response = self.fetch('/a/ticket/create')
        self.assertEqual(0, tornado.escape.json_decode(response.body)['code'])
