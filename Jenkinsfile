pipeline {
	agent any
	tools {
		nodejs 'NodeJS'
	}
	environment {
		SONAR_PROJECT_KEY = 'node'
		SONAR_SCANNER_HOME = tool 'SonarQubeScanner'
	}

	stages {
		stage('Checkout Github'){
			steps {
				git branch: 'main', credentialsId: 'github-cred', url: 'https://github.com/ApriIrwansyah/Jenkins_Sonarqube_Docker.git'
			}
		}
		
		stage('Install node dependencies'){
			steps {
				sh 'npm install'
			}
		}
		stage('Tests'){
			steps {
				sh 'npm test'
			}
		}
		stage('SonarQube Analysis'){
			steps {
				withCredentials([string(credentialsId: 'sonarqube_token', variable: 'SONAR_TOKEN')]) {
				   
					withSonarQubeEnv('SonarQube') {
						sh """
                  				${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                  				-Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                    				-Dsonar.sources=. \
                   				-Dsonar.host.url=http://<sonarqube-url> \
                    				-Dsonar.login=${SONAR_TOKEN}
                    				"""
					}	
				}
			}
		}
	}
	post {
		success {
			echo 'Build completed succesfully!'
		}
		failure {
			echo 'Build failed. Check logs.'
		}
	}
}
