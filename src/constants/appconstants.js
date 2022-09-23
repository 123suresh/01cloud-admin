export const AppConstants = {
  ClusterProvider : {
      GCP : 'gcp',
      EKS : 'aws',
      CLOUDFLARE: 'cloudflare',
      Other: 'other'
  },
  ClusterStatus : {
      Drafted: 'drafted', 
      Planning: 'cluster-planing',
      Planned: 'planned' , 
      Applying: 'cluster-applying',        
      Applied: 'applied',
      Destroyed: 'destroyed',
      Imported: 'imported',
      PackageInstalling: 'package-installing',        
      PackageInstalled: 'package-installed'
  },
  WorkflowStatus: {
      Succeeded: 'Succeeded',
      Running: 'Running' ,
      Pending: 'Pending',
      Failed: 'Failed' 
  },
  BackupStatus: {
      New: "New",
      InProgress: "InProgress",
      Completed: "Completed",
      Failed: "Failed",
      FailedValidation: "FailedValidation",
      PartiallyFailed: "PartiallyFailed",
      PartiallyDone: "PartiallyDone",
      Deleting: "Deleting"
  },
  gitProviders: [{
      name: "Github",
      service_name: "github",
      icon: "/images/icons/github.svg",
      authType: 1,
      authorizeEndpoint: window?.config?.REACT_APP_GITHUB_AUTHORIZE_ENDPOINT,
      params: [
          `client_id=${window?.config?.REACT_APP_GITHUB_CLIENTID}`,
          `redirect_uri=${window?.config?.REACT_APP_OAUTH_REDIRECT_URL}`,
          `scope=repo,admin:repo_hook`,
          `state=github_repo`
      ].join("&")
  }],
  crProviders: [{
      name: "DockerHub",
      service_name: "dockerhub",
      icon: "/images/icons/dockerhub.svg",
      authType: 2,
      config: {
          "keys": [
              "service_code",
              "service_user"
          ],
          "properties": {
              "service_code": {
                  "description": "",
                  "errorDescription": "",
                  "form": true,
                  "title": "Token",
                  "type": "string",
                  "validation": "",
                  "value": ""
              },
              "service_user": {
                  "description": "",
                  "errorDescription": "",
                  "form": true,
                  "title": "User",
                  "type": "string",
                  "validation": "",
                  "value": ""
              }
          },
          "type": "object"
      }
  }],
  Weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"],
  packages: {
      VELERO: "velero",
      SECRET_PATCHER: "zerone-secret-patcher",
      ARGO: "zeron-argo",
  },
  validationRegex: {
    email: new RegExp(/([\w.-]+@([\w-]+)\.+\w{2,}$)/),
    default: new RegExp(/^[A-Za-z0-9_ -]{3,30}$/),
    projectCode: new RegExp(/^(\w|\d){0,5}$/),
    domain: new RegExp(/^([a-z0-9|-]+\.)*[a-z0-9|-]+\.[a-z]+$/),
    url: new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/),
}
}