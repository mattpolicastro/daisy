# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.provision "ansible" do |ansible|
    ansible.ask_vault_pass = true
    ansible.extra_vars = {
      hosts: "all"
    }
    ansible.force_remote_user = "true"
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
    web.vm.provision "ansible" do |ansible|
      ansible.ask_vault_pass = true
      ansible.groups = {
        "webservers" => "web",
        "nginx" => "web"
      }
      ansible.playbook = "ansible/webservers.yml"
      ansible.raw_arguments = ["--extra-vars=@ansible/config.json"]
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
    db.vm.provision "ansible" do |ansible|
      ansible.ask_vault_pass = true
      ansible.groups = {
        "dbservers" => "db"
      }
      ansible.playbook = "ansible/dbservers.yml"
      ansible.raw_arguments = ["--extra-vars=@ansible/config.json"]
    end
    db.vm.synced_folder ".", "/vagrant", disabled: true
  end
end
