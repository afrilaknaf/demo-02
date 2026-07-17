@Library("Jenkins-Git") _

pipeline{
    agent any

    stages{
        stage("Git Checkout"){
            steps{
                checkoutSCm(url:"https://github.com/afrilaknaf/demo-02.git",branch:"main")
            }
        }


        stage("Check_Version"){
            steps{
                bat '''
                echo CHeck the version of npm package
                node -v
                npm -v
                '''
            }
        }


        stage("Install_Package"){
            steps{
                bat '''
                echo Install Project required Package 
                npm install
                '''
            }
        }


        stage("Build the project"){
            steps{
                bat '''
                echo Build the forntend Project
                npm run build
                '''
            }
        }

        stage("Check the dist folder"){
            steps{
                bat '''
                echo Check the dist folder
                if not exist dist (
                    echo No file exist like dist
                    exit /b 1
                )
                '''
            }
        }

        stage("List file folder"){
            steps{
                bat '''
                echo List the file inside the folder
                dir dist
                '''
            }
        }

        stage("Data saved in Artifacts"){
            steps{
                archiveArtifacts(
                    artifacts : 'dist/**',
                    fingerprint : true
                )
            }
        }


    }


    post{
        success{
            bat "echo All build are running successfully"
        }
        failure{
            bat "echo If one build fail i will run"
        }
    }
}