# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.provision "bootstrap", type: "ansible" do |ansible|
    ansible.ask_vault_pass = true
    ansible.extra_vars = {
      hosts: "all",
      # Force vagrant on first ssh to box
      ansible_user: "vagrant"
    }
    ansible.playbook = "ansible/bootstrap.yml"
    ansible.raw_arguments = ["--extra-vars=@ansible/config.json"]
  end

  config.vm.define "web" do |web|
    web.landrush.enabled = true
    web.ssh.insert_key = "false"

    web.vm.box = "ubuntu/trusty64"
    web.vm.hostname = "web.vagrant.dev"
    web.vm.provider "virtualbox" do |vb|
      vb.memory = "512"
      vb.cpus = "1"
    end
    web.vm.provision "web", type: "ansible" do |web|
      web.ask_vault_pass = true
      web.groups = {
        "webservers" => "web",
        "nginx" => "web"
      }
      web.playbook = "ansible/webservers.yml"
      web.raw_arguments = ["--extra-vars=@ansible/config.json"]
    end
    web.vm.synced_folder ".", "/vagrant"
  end

  config.vm.define "db" do |db|
    db.landrush.enabled = true
    db.ssh.insert_key = "false"

    db.vm.box = "ubuntu/trusty64"
    db.vm.hostname = "db.vagrant.dev"
    db.vm.provider "virtualbox" do |vb|
      vb.memory = "512"
      vb.cpus = "1"
    end
    db.vm.provision "db", type: "ansible" do |db|
      db.ask_vault_pass = true
      db.groups = {
        "dbservers" => "db"
      }
      db.playbook = "ansible/dbservers.yml"
      db.raw_arguments = ["--extra-vars=@ansible/config.json"]
    end
    db.vm.synced_folder ".", "/vagrant", disabled: true
  end
end
