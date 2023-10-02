# clone
https://github.com/ZeroCho/sleact.git

----------------------- default back --------------------------
# back end setting
## setting
cd back

npm insatll
- error 발생하는 경우
  - npm i -g node-gyp
  - npm i bcrypt

touch .env

```
COOKIE_SECRET=sleactcookie
MYSQL_PASSWORD=nodejsbook
```

install mysql
- https://thebook.io/
- https://thebook.io/080229/ch07/
- `C:\Program Files\MySQL\MySQL Server 8.0\bin`
  - mysql -h localhost -u root -p

setting db
- back 폴더 내에서
  - npx sequelize db:create
  - models 폴더 내의 파일을 기준으로 테이블을 생성함


npm run dev
- test

seeders
- npx sequelize db:seed:all
  - 워크스페이스 생성
  - 가짜 데이터를 위해

-------------------------------------------------


# start

cd alecture

npm init
- name의 경우 설치할 npm이랑 곂치면 에러가 발생한다.

npm install react react-dom

npm install typescript

npm install @types/react @types/react-dom

프로젝트 진행전 다음과 같은 내용을 미리 추가해두면 개발이 편함
- eslint
- prettier

npm i -D eslint

npm i -D prettier eslint-plugin-prettier eslint-config-prettier

프리티어 컨피그 생성
- `.prettierrc`
- ```
  {
    "extends": ["plugin:prettier/recommended"]
  }
  ```

eslint 컨피그 생성
- `.eslintrc`
- ```
  {
    "printWidth": 120,
    "tabWidth": 2,
    "singleQuote": true,
    "trailingComma": "all",
    "semi": true
  }
  ```

tsconfig.json
```
{
  "compilerOptions": {

    "esModuleInterop": true,
    "sourceMap": true,
    "lib": ["ES2020", "DOM"],
    "jsx": "react",
    "module": "esnext",
    "moduleResolution": "Node",
    "target": "ES5",
    "strict": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@hooks/*": ["hooks/*"],
      "components/*": ["components/*"],
      "layouts/*": ["layouts/*"],
      "pages/*": ["pages/*"],
      "utils/*": ["utils/*"],
      "typings/*": ["typings/*"]
    }
  }
}
```

install webpack
- npm i -D webpack @babel/core babel-loader @babel/preset-env @babel/preset-react
- npm i -D @types/webpack @types/node @babel/preset-typescript

webpack config ts
```
import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack, { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  name: 'my-lecture',
  mode: isDevelopment ? 'development' : 'production',
  devtool: !isDevelopment ? 'hidden-source-map' : 'eval',
  resolve: {
    // 바벨이 처리할 확장자
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@layouts': path.resolve(__dirname, 'layouts'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@typings': path.resolve(__dirname, 'typings'),
    },
  },
  entry: {
    app: './client',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['IE 11'] },
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ]
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      // eslint: {
      //   files: "./src/**/*",
      // },
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
  },
  devServer: {
    historyApiFallback: true, // react router
    port: 3090,
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },
    proxy: {
      '/api/': {
        target: 'http://localhost:3095',
        changeOrigin: true,
      },
    },
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }));
}
if (!isDevelopment && config.plugins) {
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

export default config;

```

install css
- npm i style-loader css-loader