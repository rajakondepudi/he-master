@Library('sharedLibrary@main') // Replace 'your-shared-library-name' and 'master' with the appropriate branch/tag
import groovy.transform.Field
import sharedpipeline.Jenkinsfile // Make sure to adjust the import path accordingly

sharedpipeline.Jenkinsfile.runSharedPipeline(
    dockerImageName: "hdfcero-master:${env.BUILD_NUMBER}",
    gitUrl: 'https://github.com/rajakondepudi/he-master.git'
)
