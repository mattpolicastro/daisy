# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.define "web" do |web|
    web.vm.box = "ubuntu/trusty64"
    web.vm.network "forwarded_port", guest: 3000, host: 3000
    # web.vm.network "private_network", ip: "192.168.0.1"
    web.vm.synced_folder "..", "/vagrant"
    web.vm.provider "virtualbox" do |vb|
      vb.memory = "512"
      vb.cpus = "1"
    end
    # web.vm.provision "ansible" do |ansible|
    #   ansible.playbook = "web_playbook.yml"
    # end
  end

  config.vm.define "db" do |db|
    db.vm.box = "ubuntu/trusty64"
    db.vm.network "forwarded_port", guest: 27017, host: 27017
    # db.vm.network "private_network", ip: "192.168.0.2"
    db.vm.synced_folder ".", "/vagrant", disabled: true
    db.vm.provider "virtualbox" do |vb|
      vb.memory = "512"
      vb.cpus = "1"
    end
    # db.vm.provision "ansible" do |ansible|
    #   # ansible.playbook = "web_playbook.yml"
    # end
  end

end
