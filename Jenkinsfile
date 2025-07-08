pipeline {
	agent any
	// tools {
	// 	nodejs 'NodeJS'
	// }

    // Variabel lingkungan yang akan digunakan di seluruh pipeline.
	environment {
        // Mengambil token SonarCloud dari Jenkins Credentials.
        // Pastikan 'SONARCLOUD_TOKEN' adalah ID dari Secret Text credential yang sudah kamu buat di Jenkins.
        // SONAR_TOKEN = credentials('SONARCLOUD_TOKEN') // Sudah di buat dibawah stage('SonarQube Analysis'){}
        SONAR_PROJECT_KEY = 'ApriIrwansyah_Jenkins_Sonarqube_Docker' // Jenkins_Sonarqube_Docker
        SONAR_ORGANIZATION_KEY = 'ApriIrwansyah' // Ganti dengan organization key SonarCloud-mu
		SONAR_SCANNER_HOME = tool 'SonarQubeScanner'
        // SONAR_HOST_URL = 'http://localhost:9000'
	}

	stages {
		stage('Checkout Github'){
			steps {
                // Melakukan clone repositori Git dari GitHub.
                // 'jenkinsSonarqube_git_cred' adalah ID dari credential Git (misal: Username with password)
                // yang kamu gunakan di Jenkins untuk mengakses repositori ini.
                // Jika repositori publik, `credentialsId` bisa dihilangkan.
                
				// git branch: 'main', credentialsId: 'github-cred', url: 'https://github.com/iQuantC/Simple_NodeJS_App.git'
                git branch: 'main', credentialsId: 'jenkinsSonarqube_git_cred', url: 'https://github.com/ApriIrwansyah/Jenkins_Sonarqube_Docker.git'
                echo "Kode berhasil di-checkout dari Git."
			}
		}

        stage('Build Project') {
            steps {
                // Tahap opsional: Jika proyek kamu memerlukan build (misal: Maven, Gradle) sebelum dianalisis,
                // tambahkan perintah build di sini.
                // Contoh untuk proyek Maven:
                // sh 'mvn clean install'
                // Contoh untuk proyek Node.js:
                // sh 'npm install'
                // Karena ini repositori contoh untuk SonarQube, kita mungkin tidak memerlukan build kompleks.
                echo "Tahap Build Project (jika diperlukan)."
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
				    // withCredentials([string(credentialsId: 'sonarqube_token_localhost', variable: 'SONAR_TOKEN')]) {                                        
					// withSonarQubeEnv('SonarQube') {
                    // withSonarQubeEnv(credentialsId: 'sonarqube_token_localhost') {
                    withSonarQubeEnv([string(credentialsId: 'sonarqube_token_localhost', variable: 'SONAR_TOKEN')]) {
						sh """
                  				${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                  				-Dsonar.projectKey=${SONAR_PROJECT_KEY} \
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
                    // 'SonarCloud' adalah nama konfigurasi server SonarQube yang sama.
                    // 'abortPipeline: true' akan membuat pipeline gagal jika Quality Gate tidak terpenuhi.
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
            // echo "Pipeline berhasil dieksekusi!"
			echo 'Build completed succesfully!'
		}
		failure {
            // echo "Pipeline gagal! Periksa log untuk detail lebih lanjut."
			echo 'Build failed. Check logs.'
		}
	}

}






// pipeline {
//     // Definisi agen: Pipeline akan berjalan di agen Jenkins manapun yang tersedia.
//     agent any 
    
    
//     // Variabel lingkungan yang akan digunakan di seluruh pipeline.
//     environment {
//         // Mengambil token SonarCloud dari Jenkins Credentials.
//         // Pastikan 'SONARCLOUD_TOKEN' adalah ID dari Secret Text credential yang sudah kamu buat di Jenkins.
//         SONAR_TOKEN = credentials('SONARCLOUD_TOKEN') 

//         // Konfigurasi SonarCloud. Ganti dengan nilai yang sesuai untuk proyek dan organisasimu.
//         SONAR_PROJECT_KEY = 'ApriIrwansyah_Jenkins_Sonarqube_Docker' 
//         SONAR_ORGANIZATION_KEY = 'ApriIrwansyah' // Ganti dengan organization key SonarCloud-mu
//         // http://localhost:9000
//         SONAR_HOST_URL = 'http://localhost:9000'
//     }

//     // Tahapan (stages) dari pipeline.
//     stages {
//         stage('Checkout Github') {
//             steps {
//                 // Melakukan clone repositori Git dari GitHub.
//                 // 'jenkinsSonarqube_git_cred' adalah ID dari credential Git (misal: Username with password)
//                 // yang kamu gunakan di Jenkins untuk mengakses repositori ini.
//                 // Jika repositori publik, `credentialsId` bisa dihilangkan.
//                 git branch: 'main', credentialsId: 'jenkinsSonarqube_git_cred', url: 'https://github.com/ApriIrwansyah/Jenkins_Sonarqube_Docker.git'
//                 echo "Kode berhasil di-checkout dari Git."
//             }
//         }

//         stage('Insr {}

//         stage('Build Project') {
//             steps {
//                 // Tahap opsional: Jika proyek kamu memerlukan build (misal: Maven, Gradle) sebelum dianalisis,
//                 // tambahkan perintah build di sini.
//                 // Contoh untuk proyek Maven:
//                 // sh 'mvn clean install'
//                 // Contoh untuk proyek Node.js:
//                 // sh 'npm install'
//                 // Karena ini repositori contoh untuk SonarQube, kita mungkin tidak memerlukan build kompleks.
//                 echo "Tahap Build Project (jika diperlukan)."
//             }
//         }

//         stage('SonarCloud Analysis') {
//             steps {
//                 // Menggunakan `withSonarQubeEnv` untuk menyiapkan lingkungan untuk SonarScanner.
//                 // 'SonarCloud' harus sesuai dengan nama konfigurasi SonarQube Server di Jenkins (Manage Jenkins -> Configure System).
//                withSonarQubeEnv(credentialsId: 'sonarqube_token_localhost') {
//                     // Perintah untuk menjalankan SonarScanner CLI.
//                     // Pastikan SonarScanner CLI sudah terinstal dan terkonfigurasi di Jenkins Global Tool Configuration.
//                     sh "sonar-scanner " +
//                        "-Dsonar.projectKey=${SONAR_PROJECT_KEY} " +
//                        "-Dsonar.organization=${SONAR_ORGANIZATION_KEY} " +
//                        "-Dsonar.host.url=${SONAR_HOST_URL} " +
//                        "-Dsonar.token=${SONAR_TOKEN}"
//                     echo "Analisis SonarCloud telah dimulai."
//                 }
//             }
//         }

//         stage('Quality Gate Check') {
//             steps {
//                 // Tahap opsional namun direkomendasikan: Menunggu hasil Quality Gate dari SonarCloud.
//                 // Pipeline akan menunggu hingga analisis selesai dan memeriksa status Quality Gate.
//                 // Jika Quality Gate gagal, pipeline akan gagal.
//                 timeout(time: 15, unit: 'MINUTES') { // Batas waktu 15 menit untuk menunggu Quality Gate
//                     // 'SonarCloud' adalah nama konfigurasi server SonarQube yang sama.
//                     // 'abortPipeline: true' akan membuat pipeline gagal jika Quality Gate tidak terpenuhi.
//                     waitForQualityGate abortPipeline: true 
//                 }
//                 echo "Pemeriksaan Quality Gate selesai."
//             }
//         }
//     }

//     // Bagian 'post' akan dieksekusi setelah semua stage selesai, terlepas dari hasilnya.
//     post {
//         always {
//             echo "Pipeline selesai. Periksa SonarCloud untuk hasil analisis lengkap."
//         }
//         success {
//             echo "Pipeline berhasil dieksekusi!"
//         }
//         failure {
//             echo "Pipeline gagal! Periksa log untuk detail lebih lanjut."
//         }
//     }
// }
