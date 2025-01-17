<div style="text-align:center">
  <img src=".cheer/img/cheer_main_image.png" width=500  />
</div>

## Cheer

### Install Cheer application

Go to [our official page](https://cheer.konkontam.com/) and see start guide.

### Start development

Build and lunch Cheer for development.

```
yarn dev
```

Lunch as debug mode. (It uses past Slack messages as data for debugging)

```
yarn dev:debug
```

If you want to see components.

```
yarn storybook
```

### Secret variables

Cheer uses some secret variables like Slack secret token.
Those are not included in this repo, and those should be included in sectet.ts before any build.

|        Name        |                         Description                         |
| :----------------: | :---------------------------------------------------------: |
|  SLACK_CLIENT_ID   |                       slack client id                       |
| SLACK_REDIRECT_URL |                     slack redirect url                      |
|   DEV_SCHEME_URL   |                     url scheme for dev                      |
| STORAGE_AUTH_TOKEN | storage name for electron-store (specific for secret value) |

For development, you should get Slack tokens. (WIP)

### Build environment variables

|    Name    |                             Description                              |
| :--------: | :------------------------------------------------------------------: |
| DEBUG_MODE |        Using debug behaver (ex: using past messages on Slack)        |
| DEBUG_PROD | For production build with inspect tools (ex: enable chrome devtools) |
| BUILD_E2E  |   For e2e build. It includes minimum special behaver for e2e test    |

## Author

- Kontam
- https://twitter.com/kontam0111

## License

MIT © Kontam
