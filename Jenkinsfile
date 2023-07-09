pipeline 
   {
    agent any
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
                    def dockerImageName = "hdfcero-master:${env.BUILD_NUMBER}"
                    sh "docker build -t ${dockerImageName} ."
                   }
              }
           }
       
       }
   }
