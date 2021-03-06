FROM docker.io/gsmlg/code-server:v3.11.0

LABEL mantainer="GSMLG <gsmlg.com@gmail.com>"

ENV container=docker
ENV LC_ALL=C

USER root

# update package list
RUN apt-get update && apt-get upgrade -y

# install useful packages
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y -qq \
  git \
  gnupg \
  lsb-release \
  silversearcher-ag \
  tzdata \
  make \
  gcc pkg-config libssl-dev libcrypto++-dev \
  vim

# install jdk
RUN apt-get install -y default-jdk

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
  apt-get install -y -qq nodejs && \
  npm install -g yarn

# install golang
RUN export ARCH=`dpkg --print-architecture`; \
  export GO_VERSION="1.16.6"; \
  export GOPKG="go${GO_VERSION}.linux-${ARCH}.tar.gz"; \
  curl -sSL "https://golang.org/dl/${GOPKG}" -o "/tmp/${GOPKG}" \
  && tar -C /usr/local -xzf "/tmp/${GOPKG}" \
  && export GOPATH="/opt/go" && mkdir -p "${GOPATH}" \
  && echo "export PATH=${PATH}:/usr/local/go/bin:${GOPATH}/bin" | tee -a "/etc/zsh/zshenv" \
  && echo "export GOPATH=${GOPATH}" | tee -a "/etc/zsh/zshenv" \
  && /usr/local/go/bin/go get -v golang.org/x/tools/gopls \
  && /usr/local/go/bin/go get -v github.com/ramya-rao-a/go-outline \
  && /usr/local/go/bin/go get -v golang.org/x/tools/cmd/goimports \
  && /usr/local/go/bin/go get -v github.com/rogpeppe/godef \
  && /usr/local/go/bin/go env -w GO111MODULE=on \
  && /usr/local/go/bin/go env -w GOPROXY=https://goproxy.cn,direct

# install kubectl
RUN export ARCH=`dpkg --print-architecture`; \
  curl -sSfLo kubectl "https://storage.googleapis.com/kubernetes-release/release/v1.21.1/bin/linux/${ARCH}/kubectl" \
  && chmod +x kubectl \
  && mv kubectl /usr/local/bin/kubectl

# install skaffold
RUN export ARCH=`dpkg --print-architecture`; \
  curl -sSfLo skaffold "https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-${ARCH}" \
  && chmod +x skaffold \
  && mv skaffold /usr/local/bin/skaffold

# install helm
RUN export ARCH=`dpkg --print-architecture`; \
  curl -sSfLo /tmp/helm.tar.gz "https://get.helm.sh/helm-v3.6.3-linux-${ARCH}.tar.gz" \
  && tar zxf /tmp/helm.tar.gz --strip=1 -C /tmp \
  && mv /tmp/helm /usr/local/bin/helm

# clean cache install
RUN rm -rf /var/cache/* && rm -rf /tmp/*

USER coder
