declare module '*.dat' {
  const _path: string;
  export default _path;
}

declare module '*.typeface' {
  const _path: string;
  export default _path;
}

declare module '*.css' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}
