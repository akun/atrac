#!/usr/bin/env python


import tornado.web


class JsonHandler(tornado.web.RequestHandler):

    def set_default_headers(self):
        self.set_header('Content-Type', 'application/json')
