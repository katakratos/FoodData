FROM stain/jena-fuseki

USER root

RUN apk add --update python3

USER fuseki

COPY ./FondOnto.owl /tmp/

COPY ./pages /fuseki/pages

CMD /jena-fuseki/fuseki-server --file=/tmp/FondOnto.owl /foodData & python3 -m http.server --directory /fuseki/pages 80