# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.provision "bootstrap", type: "ansible" do |ansible|
    ansible.ask_vault_pass = true
    ansible.extra_vars = {
      hosts: "all"
    }
    ansible.playbook = "ansible/bootstrap.yml"
    ansible.raw_arguments = ["--extra-vars=@ansible/config.json"]
    ansible.tags = ['basics']
  end

  config.vm.define "web" do |web|
    web.landrush.enabled = true
    web.ssh.insert_key = "false"

    web.vm.box = "geerlingguy/ubuntu1604"
    web.vm.hostname = "web.vagrant.dev"
    web.vm.provider "virtualbox" do |vb|
      vb.memory = "512"
      vb.cpus = "1"
    end
    web.vm.provision "web", type: "ansible" do |web_ansible|
      web_ansible.ask_vault_pass = true
      web_ansible.groups = {
        "webservers" => "web",
        "nginx" => "web"
      }
      web_ansible.playbook = "ansible/webservers.yml"
      web_ansible.raw_arguments = [
        "--extra-vars=@ansible/config.json"
      ]
    end
    web.vm.synced_folder ".", "/tmp/daisy"
  end

  config.vm.define "db" do |db|
    db.landrush.enabled = true
    db.ssh.insert_key = "false"

    db.vm.box = "geerlingguy/ubuntu1604"
    db.vm.hostname = "db.vagrant.dev"
    db.vm.provider "virtualbox" do |vb|
      vb.memory = "512"
      vb.cpus = "1"
    end
    db.vm.provision "db", type: "ansible" do |db_ansible|
      db_ansible.ask_vault_pass = true
      db_ansible.groups = {
        "dbservers" => "db"
      }
      db_ansible.playbook = "ansible/dbservers.yml"
      db_ansible.raw_arguments = [
        "--extra-vars=@ansible/config.json"
      ]
    end
  end
end
