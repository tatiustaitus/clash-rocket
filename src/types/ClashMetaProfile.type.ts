export type ClashMetaProfile = {
  "mixed-port"?: number;
  "allow-lan"?: boolean;
  "log-level"?: string;
  secret?: string | null;
  "external-controller"?: string;
  ipv6?: boolean;
  mode?: string;
  dns?: DNS;
  profile?: Profile;
  "proxy-groups"?: ProxyGroup[];
  proxies?: Proxy[];
  "rule-providers"?: RuleProviders;
  rules?: string[];
  tun?: Tun;
};

export type DNS = {
  enable?: boolean;
  "use-hosts"?: boolean;
  "enhanced-mode"?: string;
  "fake-ip-range"?: string;
  listen?: string;
  "prefer-h3"?: boolean;
  "fake-ip-filter"?: string[];
  "default-nameserver"?: string[];
  nameserver?: string[];
};

export type Profile = {
  "store-selected"?: boolean;
};

export type Proxy = {
  name?: string;
  type?: Type;
  server?: string;
  port?: number;
  alpn?: Alpn[];
  uuid?: string;
  servername?: string;
  tls?: boolean;
  udp?: boolean;
  "skip-cert-verify"?: boolean;
  network?: Network;
  "ws-opts"?: WsOpts;
  password?: string;
  sni?: string;
  "grpc-opts"?: GrpcOpts;
  "h2-opts"?: H2Opts;
  "http-opts"?: HTTPOpts;
};

export enum Alpn {
  H2 = "h2",
  HTTP11 = "http/1.1",
}

export type GrpcOpts = {
  "grpc-service-name"?: string;
};

export type H2Opts = {
  path?: string;
  host?: string[];
};

export type HTTPOpts = {
  path?: string[];
  host?: string[];
};

export enum Network {
  Grpc = "grpc",
  H2 = "h2",
  HTTP = "http",
  Ws = "ws",
}

export enum Type {
  Trojan = "trojan",
  Vless = "vless",
  Vmess = "vless",
}

export type WsOpts = {
  path?: string;
  headers?: Headers;
};

export type Headers = {
  Host?: string;
};

export type ProxyGroup = {
  name?: string;
  proxies?: string[];
  type?: string;
  url?: string;
  interval?: number;
  lazy?: boolean;
  tolerance?: number;
};

export type RuleProviders = {
  blocked?: Blocked;
  tmpblocked?: Blocked;
  open?: Blocked;
};

export type Blocked = {
  type?: Network;
  behavior?: string;
  url?: string;
  path?: string;
  interval?: number;
};

export type Tun = {
  enable?: boolean;
  stack?: string;
  "dns-hijack"?: string[];
  "auto-redir"?: boolean;
  "auto-route"?: boolean;
  "auto-detect-interface"?: boolean;
};
