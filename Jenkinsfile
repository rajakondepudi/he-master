pipeline 
   {
    agent any
      environment 
      {
        DOCKER_IMAGE_NAME = "hdfcero-master:${env.BUILD_NUMBER}"
         CREDENTIALS_ID = 'google-gcr'
         
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
          stage('Build image') {
  app = docker.build("[jenkins-cicd-391104]/${DOCKER_IMAGE_NAME}")
}
stage('Push image') 
          {
             docker.withRegistry('https://eu.gcr.io', 'gcr:[CREDENTIALS_ID]') 
             {
               app.push("${env.BUILD_NUMBER}")
               app.push("latest")
             }
           }
       
       }
   }
