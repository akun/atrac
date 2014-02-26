#!/usr/bin/env python


import mimetypes
import urllib

from tornado.options import options
import tornado

from atrac.share import JsonHandler
from atrac.versioncontrol.svn.svn_fs import FILE, FOLDER, get_code


class SourceReadHandler(JsonHandler):

    def get(self, path=None):
        full_path = path if path else ''
        result = {}
        code_kind, code_info = get_code(options.repos, full_path)
        if code_kind == FILE:
            result = {
                'content': code_info,
                'mimetype': get_mimetype(full_path),
            }
        elif code_kind == FOLDER:
            result['nodes'] = []
            for code in code_info:
                result['nodes'].append({
                    'name': code.name,
                    'path': code.file_path,
                    'kind': code.kind,
                })
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': result
        })
        self.write(json_out)


def get_mimetype(full_path):
    url = urllib.pathname2url(full_path)
    mimetype, _ = mimetypes.guess_type(url)
    return mimetype
