pipeline {
    // Menentukan agen untuk menjalankan pipeline (misal: "any" untuk Jenkins agent mana pun)
    agent any 

    // Variabel lingkungan yang akan digunakan di seluruh pipeline.
    environment {
        // Project Key yang benar, sesuai dengan nama repositori di GitHub dan SonarCloud
        SONAR_PROJECT_KEY = 'ApriIrwansyah_Jenkins_Sonarqube_Docker' // Jenkins_Sonarqube_Docker
        // Organization Key di SonarCloud
        SONAR_ORGANIZATION_KEY = 'ApriIrwansyah' 
        // URL host untuk SonarCloud
        SONAR_HOST_URL = 'https://sonarcloud.io' // 'http://localhost:9000'
        // Mengambil path ke SonarQube Scanner yang sudah dikonfigurasi di Jenkins Global Tool Configuration.
        // Pastikan nama 'SonarQubeScanner' sesuai dengan nama yang kamu berikan di konfigurasi Jenkins.
        SONAR_SCANNER_HOME = tool 'SonarQubeScanner'
    }

    // Tahapan (stages) dari pipeline.
    stages {
        stage('Checkout Github') {
            steps {
                // Melakukan clone repositori Git dari GitHub.
                // 'jenkinsSonarqube_git_cred' adalah ID dari credential Git (misal: Username with password)
                // yang kamu gunakan di Jenkins untuk mengakses repositori ini.
                // Jika repositori publik, `credentialsId` bisa dihilangkan.
                git branch: 'main', credentialsId: 'jenkinsSonarqube_git_cred', url: 'https://github.com/ApriIrwansyah/Jenkins_Sonarqube_Docker.git'
                echo "Kode berhasil di-checkout dari Git."
            }
        }

        // Tahap 'Build Project', 'Install Node Dependencies', dan 'Tests' tidak ada di snippet yang kamu berikan.
        // Jika kamu memerlukannya, tambahkan kembali stage tersebut dan pastikan 'tools { nodejs 'NodeJS' }'
        // diaktifkan di awal pipeline jika kamu menggunakan Node.js yang dikelola Jenkins.

        stage('SonarCloud Analysis') {
            steps {
                // Menggunakan `withCredentials` untuk meneruskan token secara aman.
                // 'sonarqube_token_localhost' adalah ID dari Secret Text credential kamu.
                // Variabel 'SONAR_TOKEN' akan tersedia di dalam blok ini.
                withCredentials([string(credentialsId: 'sonarqube_token', variable: 'SONAR_TOKEN')]) {
                    // Menggunakan `withSonarQubeEnv` untuk menyiapkan lingkungan untuk SonarScanner.
                    // 'SonarQube' harus sesuai dengan nama konfigurasi SonarQube Server di Jenkins
                    // (Manage Jenkins -> Configure System -> SonarQube servers).
                    // Jika kamu menggunakan SonarCloud, umumnya nama konfigurasinya 'SonarCloud',
                    // tapi jika kamu sudah set dengan nama 'SonarQube', biarkan saja.
                    withSonarQubeEnv('SonarQube') { 
                        // Perintah untuk menjalankan SonarScanner CLI.
                        // Menggunakan 'bat' untuk eksekusi di Windows.
                        // Menggunakan %SONAR_SCANNER_HOME% untuk variabel lingkungan Windows.
                        // Menggunakan %SONAR_TOKEN% untuk token yang diambil secara aman.
                        bat """
                            "%SONAR_SCANNER_HOME%\\bin\\sonar-scanner.bat" ^
                            -Dsonar.projectKey=${SONAR_PROJECT_KEY} ^
                            -Dsonar.organization=${SONAR_ORGANIZATION_KEY} ^
                            -Dsonar.host.url=${SONAR_HOST_URL} ^
                            -Dsonar.sources=. ^
                            -Dsonar.token=%SONAR_TOKEN%
                        """
                        echo "Analisis SonarCloud telah dimulai."
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





// pipeline {
//     // Menentukan agen untuk menjalankan pipeline (misal: "any" untuk Jenkins agent mana pun)
//     agent any 

//     // Variabel lingkungan yang akan digunakan di seluruh pipeline.
//     environment {
//         // SONAR_TOKEN = credentials('SONARCLOUD_TOKEN') 
//         SONAR_PROJECT_KEY = 'Jenkins_Sonarqube_Docker' //ApriIrwansyah_Jenkins_Sonarqube_Docker
//         SONAR_ORGANIZATION_KEY = 'ApriIrwansyah' 
//         SONAR_SCANNER_HOME = tool 'SonarQubeScanner'
//     }

//     // Tahapan (stages) dari pipeline.
//     stages {
//         stage('Checkout Github') {
//             steps {
//                 git branch: 'main', credentialsId: 'jenkinsSonarqube_git_cred', url: 'https://github.com/ApriIrwansyah/Jenkins_Sonarqube_Docker.git'
//                 echo "Kode berhasil di-checkout dari Git."
//             }
//         }

//         stage('SonarCloud Analysis') {
//             steps {
// 		withCredentials([string(credentialsId: 'sonarqube_token_localhost', variable: 'SONAR_TOKEN')]) {
// 		withSonarQubeEnv('SonarQube') {
// 		sh """
//                   	${SONAR_SCANNER_HOME}/bin/sonar-scanner \
//                   	-Dsonar.projectKey=${SONAR_PROJECT_KEY} \
// 		   	-Dsonar.organization=${SONAR_ORGANIZATION_KEY} \
//                     	-Dsonar.sources=. \
//                    	-Dsonar.host.url=http://localhost:9000 \
//                     	-Dsonar.login=${SONAR_TOKEN}
//                         echo "Analisis SonarCloud telah dimulai."
//                 """
// 		}
        
// 		}
//             }
//         }

//         stage('Quality Gate Check') {
//             steps {
//                 // Tahap opsional namun direkomendasikan: Menunggu hasil Quality Gate dari SonarCloud.
//                 // Pipeline akan menunggu hingga analisis selesai dan memeriksa status Quality Gate.
//                 // Jika Quality Gate gagal, pipeline akan gagal.
//                 timeout(time: 15, unit: 'MINUTES') { // Batas waktu 15 menit untuk menunggu Quality Gate
//                     // 'waitForQualityGate' akan menggunakan konfigurasi server SonarQube yang sama
//                     // yang sudah diatur oleh `withSonarQubeEnv`.
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
//             echo 'Build completed successfully!'
//         }
//         failure {
//             echo 'Build failed. Check logs.'
//         }
//     }
// }
