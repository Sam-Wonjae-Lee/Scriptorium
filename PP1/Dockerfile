FROM ubuntu:22.04
ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    curl \
    python3.10 python3.10-venv python3-pip \
    g++ gcc make \
    openjdk-11-jdk \
    rustc cargo \
    ruby-full \
    php \
    r-base \
    wget \
    && wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb \
    && dpkg -i packages-microsoft-prod.deb \
    && rm packages-microsoft-prod.deb \
    && apt-get update \
    && apt-get install -y apt-transport-https \
    && apt-get install -y dotnet-sdk-8.0 \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN dotnet tool install -g dotnet-script

ENV PATH="${PATH}:/root/.dotnet/tools"

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate reset --force

EXPOSE 3000

CMD ["npm", "run", "dev"]