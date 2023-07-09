pipeline 
   {
    agent any
      environment 
      {
        DOCKER_IMAGE_NAME = "gcr.io/jenkins-cicd-391104/hdfcero-master:${env.BUILD_NUMBER}"
         CREDENTIALS_ID = 'google'
         
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

          stage('Tag and Push') 
          {
          steps {
              docker.withRegistry('https://gcr.io', 'gcr: google')
             sh 'docker push ${DOCKER_IMAGE_NAME}'
       }
   }
