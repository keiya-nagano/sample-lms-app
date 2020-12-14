FROM centos:7

# パッケージのインストール
RUN yum -y update
RUN yum -y groupinstall "Development Tools" \
    && yum -y install \
        openssl-devel \
        bzip2-devel \
        libffi-devel \
        wget \
        sqlite-devel \
        tar \
        gzip \
        gcc \
        make

# ソースコード類のコピー
COPY . .

# DB(SQLite)の用意
RUN wget https://www.sqlite.org/2020/sqlite-autoconf-3310100.tar.gz \
    && tar xvfz sqlite-autoconf-3310100.tar.gz \
    && /sqlite-autoconf-3310100/configure --prefix=/usr/local \
    && make \
    && make install \
    && rm sqlite-autoconf-3310100.tar.gz \
    && rm -rf /sqlite-autoconf-3310100 \
    && mv /usr/bin/sqlite3 /usr/bin/sqlite3_old \
    && ln -s /usr/local/bin/sqlite3 /usr/bin/sqlite3 \
    && export LD_LIBRARY_PATH="/usr/local/lib"
RUN chmod +x /DB/create_db.sh \
    && /DB/create_db.sh

# サーバー(Fast API)の用意
RUN wget https://www.python.org/ftp/python/3.8.2/Python-3.8.2.tgz \
    && tar xvf Python-3.8.2.tgz \
    && cd Python-3.8.2 \
    && ./configure --enable-optimizations \
    && make altinstall \
    && cd - \
    && rm -rf Python-3.8.2
RUN unlink /bin/python \
    && ln -s /usr/local/bin/python3.8 /bin/python3 \
    && ln -s /usr/local/bin/python3.8 /bin/python \
    && ln -s /usr/local/bin/pip3.8 /bin/pip3 \
    && ln -s /usr/local/bin/pip3.8 /bin/pip

RUN pip install poetry
RUN poetry export -f requirements.txt > requirements.txt
RUN pip install -r requirements.txt
CMD python /src/main.py
