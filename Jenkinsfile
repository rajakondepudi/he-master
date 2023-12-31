pipeline 
   {
    agent any
      environment 
      {
        DOCKER_IMAGE_NAME = "hdfcero-master:${env.BUILD_NUMBER}"
         CREDENTIALS_ID = 'google'
         PROJECT_ID = '	jenkins-cicd-391104'
         GKE_CLUSTER = 'jenkins-gcr'
         GKE_ZONE = 'australia-southeast1'
         NAMESPACE = 'default' 
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
                // Tag Docker image with GCR repository URL
                 sh 'docker tag ${DOCKER_IMAGE_NAME} gcr.io/jenkins-cicd-391104/${DOCKER_IMAGE_NAME}'
        
                  // Authenticate with Google Cloud using service account key
                   withCredentials([file(credentialsId: env.CREDENTIALS_ID, variable: 'GCLOUD_KEY')])  
                      {
                         sh 'gcloud auth activate-service-account --key-file="$GCLOUD_KEY"'
                         sh 'gcloud config set project jenkins-cicd-391104'
                         sh 'gcloud auth configure-docker'
          
                         // Push Docker image to GCR
                           sh 'docker push gcr.io/jenkins-cicd-391104/${DOCKER_IMAGE_NAME}'
                      } 
                  }
            }
           stage('Deploy to Gke Cluster') 
           {
            steps
               {
                  
                 // Authenticate with Google Cloud using service account key
                    withCredentials([file(credentialsId: env.CREDENTIALS_ID, variable: 'GCLOUD_KEY')]) 
                       {
                          sh 'gcloud auth activate-service-account --key-file="$GCLOUD_KEY"'
                          sh 'gcloud container clusters get-credentials $GKE_CLUSTER --zone $GKE_ZONE'
      
                          // Apply the deployment YAML to the GKE cluster
                          sh 'kubectl apply -f deployment.yaml --namespace $NAMESPACE'
                       }
               }
            }    

       }
   }
