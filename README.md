# replace-env

Command line utility for automatically replacing parts of strings delineated by `%variable_name%`
replacing them with `variable_name` environment variable if it exists. 
This allows you to easily keep sensitive parameters out of your config files and only add them as part of your build process.

### Prerequisites
You will need to have a recent version of `Node.js` installed.

## Instructions

To get started install command line tool globally by running `npm install -g replace-env`

To replace all instances of %variable% in file run `replace-env <filename>`. 
You can add as many parameters in the format %variable_name% as you like.
Just make sure that all the environment variables are set in the shell before running tool.

## Built With

* [Node.js](https://nodejs.org/en/)

## Authors

* **Dovid Gefen** - [Github Page](https://github.com/dovidgef)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
