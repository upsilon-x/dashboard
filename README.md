# Dashboard Interface
The dashboard frontend for managing game projects.  

### Note on Repository Relations
While each project should be able to run a mainnet on their own, a complete developer 
environment on the local system will need all four projects. Please complete setup of
the [firebase functions](https://github.com/upsilon-x/fb-functions) before starting this.  
Furthermore, all repositories should be within the same folder. It is best if the 
repositories related to this project are the only repositories within said folder:  
```
git-projects
    - ethereum-game-services
        - game-services
        - fb-functions
        - interface
        - simple-interface
```

## Setup

Run `npm install --legacy-peer-deps`. Some projects run on React 16 while others run on React 17.  
Taken from the Jumbo template. [Clone the repo](https://github.com/mui-org/material-ui):

## Information

[Template Docs](https://docs-jumbo.g-axon.work/next-js/folder-structure)  
[Folder Structure](https://docs-jumbo.g-axon.work/next-js/folder-structure)  

## Troubleshooting

### `Warning: Prop className did not match.`

If you get this warning, please make sure that you configure `getInitialProps` in `pages/_document.js` correctly. Check the code in this example for more details.
