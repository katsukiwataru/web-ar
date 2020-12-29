こちらの記事は[CA21 Advent Calender 2020](https://adventar.org/calendars/5308)の14日目の記事です。
内容としては、AR.jsとthree.jsを使用してWEBアプリを作るというものです。
最近触っているAR.jsについて話せていければと思います。あまり実例がなかったので大変でしたがまとめてみました。
記事と実際のコードは多少異なっておりますが、ご了承ください。

## 使用技術
- AR.js
- three.js
- React
- webpack

## 背景
[目に映るものの名前をできる限り知りたい](https://dailyportalz.jp/kiji/subete-no-namae-wo-shiritai)を見て、何かを見た時にコンテンツが表示されるというものが欲しいというのがありました。
また、「電脳コイルの電脳メガネや、ドラゴンボールのスカウターがあったら欲しい。」という気持ちで作りたくなったという形です。

## 現在の完成形
スマホで、ツイッターのidを入れCameraをクリックします。
![IMG_0840.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/580426/82dbbfe4-64e9-b314-b666-487ced11feca.png)

![IMG_0841.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/580426/1ee96089-f6a9-2068-6f3d-3a3946b69fb0.png)

続いて、PCで開き同じidを入れMarkerをクリックすると、マーカーが表示されるので、マーカーにスマホのカメラを当てます。
そうするとツイッターのidとツイッターの作成日が表示される形です。

![IMG_0843.PNG](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/580426/a4fa1d3c-70a9-1e49-7267-230ee78778d4.png)

ここまでが一旦動いているところです。

## AR.js three.js setup

#### そもそも AR.js とは
> AR.js is a lightweight library for Augmented Reality on the Web, coming with features like Image Tracking, Location-based AR and Marker tracking.

**公式ドキュメントより**
画像追跡、位置ベースのAR、マーカー追跡などの機能があります。

three.js Marker Trackingを使用するので対応しているthree.jsの  `<script>` を`defer`で読み込みます。
`defer` を使用する理由は実行されるタイミングを安定させ、HTML のパースが完了した後 `DOMContentLoaded` に JS ファイルを実行したいためです。

```html:src/index.html
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r122/three.min.js"></script>
<script defer src="https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar.js"></script>
```

#### webpack

`webpack.config.js` でも同様に React 等のライブラリを `defer` で読み込みたいため、
`html-webpack-plugin`、 `script-ext-html-webpack-plugin` を使用します。

```js:webpack.config.js
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_PATH, 'src', 'index.html'),
    }),
    new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer',
    }),
  ]
  ...
}
```

#### type
`three.js` の 型を `global` に定義します。
後述する `THREEx` の型はここで省きます。

```ts:src/types/global.d.ts
import type Three from 'three';
import type THREEx from './THREEx';

declare global {
  const THREE: typeof Three;
  const THREEx: THREEx;

  interface Window {
    THREE?: typeof THREE;
    THREEx?: typeof THREEx;
  }
}
```

## threex-artoolkit
ドキュメントにある[threex-artoolkit](https://ar-js-org.github.io/AR.js-Docs/marker-based/#threejs)を使用します。
threex-artoolkitは `three.js` と `AR.js` を簡単に使用するための拡張機能です。

#### THREEx.ArToolkitSource
位置追跡を行うために解析されるものを選択します。
`webcam`を使用するため、 `sourceType` に記載します。
他にも `video`, `image`を選択できます。

```js
const arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: 'webcam',
    displayWidth: window.innerWidth,
    displayHeight: window.innerHeight,
  });
```

#### THREEx.ArToolkitContext
> It is the main engine. It will actually find the marker position in the image source.

`cameraParametersUrl` にはカメラパラメータのURLを追記するようです。
[examples](https://github.com/jeromeetienne/AR.js/blob/8a78acb594b527ad54a3cfb2410ad23527994fb4/three.js/examples/basic.html#L83) にもあるように、`detectionMode` も同様に記載します。

```js
const arToolkitContext = new THREEx.ArToolkitContext({
  cameraParametersUrl: 'data/camera_para.dat',
  detectionMode: 'mono',
});
```

#### THREEx.ArMarkerControls
こちらはマーカーの位置を制御するものになっているようです。
patternの種類とパスを与えます。
カメラを`ArMarkerControls`の第2引数にする場合は`changeMatrixMode`になり、`new THREE.Group()`を使用する場合は`modelViewMatrix`になります。

```js
const group = new THREE.Group();

new THREEx.ArMarkerControls(arToolkitContext, group, {
  type: 'pattern',
  patternURL: 'data/patt.hiro',
  changeMatrixMode: 'modelViewMatrix',
});
```

これで `threex-artoolkit` についての設定は完了です。
あとは `init()`して動かしていきます。

```tsx

arToolkitContext.init(() => {
  perspectiveCamera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
});

arToolkitSource.init(() => {
  setTimeout(() => {
    // onResizeは後述します。
    onResize();
  }, 1000);
});
```

## three.js
`threex-artoolkit` の設定が終われば、普通に `three.js` を書けば良いです。
`Scene`, `Camera`, `Renderer` を書いていきます。

```tsx:SampleComponent.tsx

export const SampleComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scene = new THREE.Scene();
  const group = new THREE.Group();
  const perspectiveCamera = new THREE.PerspectiveCamera();

  scene.add(perspectiveCamera);
  scene.add(group);

  const webGLRenderer = useSampleWebGLRenderer(canvasRef);

  ...

  return <canvas id="canvas" ref={canvasRef} />
}
```

```jsx:useSampleWebGLRenderer.tsx
export const useSampleWebGLRenderer = (canvas: React.MutableRefObject<HTMLCanvasElement | null>) => {
  const [webGLRenderer, setWebGLRenderer] = React.useState<THREE.WebGLRenderer | null>(null);

  React.useEffect(() => {
    if (!canvas.current) return;
    const webGLRenderer = new THREE.WebGLRenderer({
      canvas: canvas.current,
      antialias: true,
      alpha: true,
    });
    webGLRenderer.setPixelRatio(window.devicePixelRatio);
    webGLRenderer.setClearColor(new THREE.Color(), 0);
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.domElement.style.position = 'absolute';
    webGLRenderer.domElement.style.top = '0px';
    webGLRenderer.domElement.style.left = '0px';
  }, [canvas]);

  return webGLRenderer;
}
```

次に画面のリサイズをする処理を書きます。

```tsx
const onResize = () => {
  arToolkitSource.onResizeElement();
  if (!webGLRenderer) return;
  arToolkitSource.copyElementSizeTo(webGLRenderer.domElement);
  if (arToolkitContext.arController !== null) {
    arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
  }
};
```

あとは、表示させたいテキストを表示させていきます。

```tsx
const useSampleTextLoader = (group: THREE.Group, text: string, y: number) => {
  React.useEffect(() => {
    const loader = new THREE.FontLoader();
    loader.load(typeface, (font) => {
      const textGeometry = new THREE.TextBufferGeometry(text, {
        font,
        size: 0.2,
        height: 0.04,
      });
      textGeometry.center();
      const textMesh = new THREE.Mesh(textGeometry, new THREE.MeshNormalMaterial());
      textMesh.position.set(0, y, 0);
      group.add(textMesh);
    });
  }, [group, text, y]);
};

useSampleTextLoader(group, 'sample', 0.75);
```

## ブラウザからマーカーを生成する

AR.js のリポジトリの examples にある [threex-arpatternfile.js](https://github.com/AR-js-org/AR.js/blob/master/three.js/examples/marker-training/threex-arpatternfile.js) を使ってブラウザから表示させるためのマーカーを生成します。
RawGitを使用してCDNとして読み込むため、`html`に`threex-arpatternfile.js`を追記します。
* RawGitはおすすめはしないのですが、ここでは使用しております。

```html
<script defer src="https://rawcdn.githack.com/AR-js-org/AR.js/a5619a021e6ff40427ff8f9c62169e99a390f56b/three.js/examples/marker-training/threex-arpatternfile.js"></script>
```

次に、`THREEx.ArPatternFile.buildFullMarker`, `THREEx.ArPatternFile.encodeImageURL` を使用して
マーカーとマーカーを画像のURLを生成します。

```tsx
  const useSampleUserPattern = () => {
  const { user, setUser } = useUserContext();
  const [marker, setMarker] = React.useState<string | null>(null);
  const [patternURL, setPatternURL] = React.useState<string | null>(null);

  const {
    params: { screenName },
  } = React.useRouteMatch<{ screenName: string }>();

  const userPattern = () => {
    (async () => {
      const currentUser = user ? user : await fetchUser(screenName);
      const iconURL = currentUser.profile_image_url_https;
      const imgDataRes = await fetch(iconURL.replace('_normal', ''));
      const imgData = await imgDataRes.blob();
      const imgLocalURL = URL.createObjectURL(imgData);
      await new Promise((resolve) => {
        THREEx.ArPatternFile.buildFullMarker(imgLocalURL, 0.5, 512, 'black', (markerUrl) => {
          resolve(markerUrl);
          setMarker(markerUrl);
        });
      });

      THREEx.ArPatternFile.encodeImageURL(imgLocalURL, (pattern) => {
        const patternBlob = new Blob([pattern], { type: 'text/plain' });
        setPatternURL(URL.createObjectURL(patternBlob));
      });
    })();
  };
  ...
}
```

`fetchUser(screenName)` はTwitterのAPIを叩いており、user情報を取得しています。`iconURL`は画像の解像度を調節するために`replace()`してます。

`patternURL` を生成して `new THREEx.ArMarkerControls` の `patternURL` へ渡せば大丈夫です。

`marker` は

```tsx
<img src={marker} alt="marker" />
```
のようにJSXの部分にかけば表示されます。
これでユーザーごとにマーカーの画像が生成できるようになりましたのでここまでとします。

## まとめ
最近はAR.jsを触っていたので、簡単にまとめてみました。
Node.jsでTwitter APIを書いてて使用しているライブラリは[こちら](https://github.com/desmondmorris/node-twitter)です。
今回はやっていることがシンプルなので、TwitterUser APIの方は省きました。
書き終わってみれば意外にも簡単に見えますが、実際コードを書いているときはかなりしんどいものがありました。（型とか）
表示させるテキストは日本語に対応できていないですし、コードも一旦動けばいいというような形で書いてましたので、まだまだ改善が必要だと個人的には感じております。

参考になった記事を載せておきます。
[https://qiita.com/aa_debdeb/items/4edf6a2e053e02305ef5](https://qiita.com/aa_debdeb/items/4edf6a2e053e02305ef5)
[https://qiita.com/aa_debdeb/items/c88338c90a0adb061002](https://qiita.com/aa_debdeb/items/c88338c90a0adb061002)

大分コードを省いているので少し分かりづらいかもしれないのですが、最後まで読んでいただいた皆さん、ありがとうございました！是非他のアドベントカレンダーにある記事もご覧ください！
