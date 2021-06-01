u:=root
h:=10.120.1.11
project_folder:=/data/js/crypto_currency_trading_admin

deploy:
	ssh -i ~/.ssh/k8s $(u)@$(h) "mkdir -p $(project_folder)"
	cd ui && rsync -avhzL -e "ssh -i ~/.ssh/k8s" --delete \
		--no-perms --no-owner --no-group \
		--exclude datafeeds/udf/node_modules \
	. $(u)@$(h):$(project_folder)/
serve:
	serve -s build
