from socket import socket

from flask import Flask, request, render_template
# https://github.com/PyMySQL/PyMySQL
import pymysql.cursors

# sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='ift3225',
                             password='ift3225',
                             db='flask_ift3225',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

app = Flask(__name__)

cur = connection.cursor()

sql_drop = "DROP TABLE IF EXISTS `users`"
sql_create_table = "CREATE TABLE `users` (`id` INTEGER PRIMARY KEY AUTO_INCREMENT, `nickname` text not null," \
                   "`passwd` text not null, `online` text, `score` INTEGER default -1, " \
                   "`role` text not null,  `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP" \
                   " ) "

sql_insert = "INSERT INTO `users` (`nickname`, `passwd`, `role`, `online`) VALUES (%s, %s, %s, %s)"

cur.execute(sql_drop)

cur.execute(sql_create_table)

cur.execute(
    sql_insert,
    ("Admin", "SuperSecret", "Admin", "No")
)

connection.commit()
connection.close()
