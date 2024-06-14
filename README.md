## Torch Dependency Demo
This is a basic demo application that isolates the issue. The idea is that the "torch" module should be included with the PyTorch AMI once "source activate pytorch" is run per the documentation, but the module is not found when running the python script. Screenshots are included in the root directory. 


### Problems to overcome
My issue is in importing the torch library. I realize that AWS has set this dependency up through an AMI, since it cannot be installed like other packages are.

I have added this AMI to my ElasticBeanstalk instance. I would send logs for this if it was configured through the .ebextensions, but these steps were managed through the dashboard. When I SSH into the EB instance, I am given a note saying "To activate pre-built pytorch environment, run: 'source activate pytorch'"

My question is, where do I run this command at? I ran it manually (through the SSH connection), but when I run my application through the GUI, I continue to get errors that this dependency is not found.

`import torch ModuleNotFoundError: No module named 'torch'`

For context, I am running a node.js app that calls some python scripts, and the python script throws the mentioned error on the line containing `import torch`.

Please help me to know where I can run the command 'source activate torch' so that our scripts can reference this dependency.


### Installation

```bash
$ npm install
```

### Running the Application

This version of the application uses an [Express](https://expressjs.com) server that can serve the site from a single page. To start the app from the terminal, run:

```bash
$ npm run dev
```
