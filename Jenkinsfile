pipeline {
    // Menentukan agen untuk menjalankan pipeline (misal: "any" untuk Jenkins agent mana pun)
    agent any 

    // Variabel lingkungan yang akan digunakan di seluruh pipeline.
    environment {
        // SONAR_TOKEN = credentials('SONARCLOUD_TOKEN') 
        SONAR_PROJECT_KEY = 'Jenkins_Sonarqube_Docker' //ApriIrwansyah_Jenkins_Sonarqube_Docker
        SONAR_ORGANIZATION_KEY = 'ApriIrwansyah' 
        SONAR_SCANNER_HOME = tool 'SonarQubeScanner'
    }

    // Tahapan (stages) dari pipeline.
    stages {
        stage('Checkout Github') {
            steps {
                git branch: 'main', credentialsId: 'jenkinsSonarqube_git_cred', url: 'https://github.com/ApriIrwansyah/Jenkins_Sonarqube_Docker.git'
                echo "Kode berhasil di-checkout dari Git."
            }
        }

        stage('SonarCloud Analysis') {
            steps {
		withCredentials([string(credentialsId: 'sonarqube_token_localhost', variable: 'SONAR_TOKEN')]) {
		withSonarQubeEnv('SonarQube') {
		sh """
                  	${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                  	-Dsonar.projectKey=${SONAR_PROJECT_KEY} \
		   	-Dsonar.organization=${SONAR_ORGANIZATION_KEY} \
                    	-Dsonar.sources=. \
                   	-Dsonar.host.url=http://localhost:9000 \
                    	-Dsonar.login=${SONAR_TOKEN}
                        echo "Analisis SonarCloud telah dimulai."
                """
		}
        
		}
            }
        }

        stage('Quality Gate Check') {
            steps {
                // Tahap opsional namun direkomendasikan: Menunggu hasil Quality Gate dari SonarCloud.
                // Pipeline akan menunggu hingga analisis selesai dan memeriksa status Quality Gate.
                // Jika Quality Gate gagal, pipeline akan gagal.
                timeout(time: 15, unit: 'MINUTES') { // Batas waktu 15 menit untuk menunggu Quality Gate
                    // 'waitForQualityGate' akan menggunakan konfigurasi server SonarQube yang sama
                    // yang sudah diatur oleh `withSonarQubeEnv`.
                    waitForQualityGate abortPipeline: true 
                }
                echo "Pemeriksaan Quality Gate selesai."
            }
        }
    }

    // Bagian 'post' akan dieksekusi setelah semua stage selesai, terlepas dari hasilnya. 
    post {
        always {
            echo "Pipeline selesai. Periksa SonarCloud untuk hasil analisis lengkap."
        }
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed. Check logs.'
        }
    }
}
