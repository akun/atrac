#!/usr/bin/env python


import os

import tornado

from atrac.share import JsonHandler
from atrac.versioncontrol.svn.svn_fs import get_file


class SourceFileHandler(JsonHandler):

    def get(self, path):
        repos_path = '/var/data/users/zhengk/me/svn/mysvn/'
        full_path = os.path.join('myproject', path)
        code = get_file(repos_path, full_path, 3)
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {'code': code}
        })
        self.write(json_out)
