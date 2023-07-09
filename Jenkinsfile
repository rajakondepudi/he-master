pipeline 
   {
    agent any
      environment 
      {
        DOCKER_IMAGE_NAME = "hdfcero-master:${env.BUILD_NUMBER}"
        GCR_IMAGE_NAME = "gcr.io/${jenkins-cicd-391104}/${DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER}"
        GCR_SERVICE_ACCOUNT_KEY = credentials('jenkins-cicd-391104')
      }
    stages 
       {
        stage('Checkout') 
           {
            steps 
               {
                git branch: 'main', credentialsId: 'github-jenkins', url: 'https://github.com/rajakondepudi/he-master.git'
               }
           }
        stage('Build')
           {
            steps 
               {
                script 
                   {
                    sh "docker build -t ${DOCKER_IMAGE_NAME} ."
                   }
              }
           }
          stage('Push to GCR') {
            steps {
                withCredentials([file(credentialsId: 'GCR_SERVICE_ACCOUNT_KEY', variable: 'GCR_KEY')]) {
                    sh "docker login -u _json_key -p '$GCR_KEY' https://gcr.io"
                    sh "docker tag ${DOCKER_IMAGE_NAME} ${GCR_IMAGE_NAME}"
                    sh "docker push ${GCR_IMAGE_NAME}"
                }
            }
        }
       
       }
   }
