curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
mkdir /daisy
sudo cp -rf /vagrant/* /daisy
cd /daisy
echo "Installing the testing server"
npm install
# echo "Silently installing the testing server"
# npm install --silent
echo "Testing server up and running"
