declare module "qrcode.react" {
  import * as React from "react";
  interface QRCodeProps {
    value: string;
    size?: number;
  }
  export default class QRCode extends React.Component<QRCodeProps> {}
}
