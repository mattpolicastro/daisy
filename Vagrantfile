# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.define "web" do |web|
    web.vm.box = "ubuntu/trusty64"
    web.landrush.enabled = true
    web.vm.hostname = "web.vagrant.dev"
    web.vm.synced_folder ".", "/vagrant"
    web.vm.provider "virtualbox" do |vb|
      vb.memory = "512"
      vb.cpus = "1"
    end
    # web.vm.provision "shell", path: "vagrant/web_bootstrap.sh"
    # web.vm.provision "ansible" do |ansible|
    #   ansible.playbook = "web_playbook.yml"
    # end
  end

  config.vm.define "db" do |db|
    db.vm.box = "ubuntu/trusty64"
    db.landrush.enabled = true
    db.vm.hostname = "db.vagrant.dev"
    db.vm.synced_folder ".", "/vagrant", disabled: true
    db.vm.provider "virtualbox" do |vb|
      vb.memory = "512"
      vb.cpus = "1"
    end
    db.vm.provision :shell, path: "vagrant/db_bootstrap.sh"
    # db.vm.provision "ansible" do |ansible|
    #   # ansible.playbook = "web_playbook.yml"
    # end
  end

end
