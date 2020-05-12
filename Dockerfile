FROM node:erbium-buster

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update -qq 
RUN apt-get install -y gettext locales -qq
RUN echo "pt_BR.UTF-8 UTF-8" >> /etc/locale.gen
RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
RUN locale-gen
RUN dpkg-reconfigure locales
ENV LC_ALL=pt_BR.UTF-8
ENV LANG=pt_BR.UTF-8
ENV LANGUAGE=pt_BR.UTF-8
ENV LC_CTYPE=pt_BR.UTF-8
ENV LC_COLLATE=pt_BR.UTF-8
# ENV NODE_ICU_DATA=node_modules/full-icu

ENV VERSION="$(git rev-parse --short HEAD)"

# COPY . /usr/src/app/
# RUN yarn
# RUN yarn relay
# RUN yarn build

EXPOSE 3000
CMD ['/bin/bash']
