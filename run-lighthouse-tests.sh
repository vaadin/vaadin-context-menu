#!/bin/sh

## Configuration
bowerDir=bower_components
elementName=vaadin-context-menu
elementDir=$bowerDir/$elementName
reportDir=./target
reportFile=$reportDir/output.json
testDir=test/light
demoDir=demo
controlMultiplier=1.1

## Tests to run
controlTest="$testDir/control.html"
tests="
  $testDir/test.html
  $testDir/test.html?dom=shadow
  $demoDir/index.html
  $demoDir/index.html?dom=shadow
"
## Executables
lighthouse=node_modules/.bin/lighthouse
serve=node_modules/.bin/serve

## Copy this component stuff to the bower_components structure
mkdir -p $elementDir/$testDir
mkdir -p $elementDir/$demoDir
cp *.html *.js* $elementDir
cp $testDir/* $elementDir/$testDir
cp $demoDir/* $elementDir/$demoDir

## Run a server in localhost
$serve --port 3000 --no-logs $bowerDir &
proc=$!
trap "kill -TERM $proc" INT TERM EXIT
sleep 1

## Tests leave json results in the reportDir
mkdir -p $reportDir

runTest() {
  url=http://localhost:3000/$elementName/$1
  echo ">>> Running test: $url"
  name=`echo $1 | tr / _`
  name=`basename $name .html`".json"
  out=$reportDir/$name
  # For debugging use --save-assets to see screenshots
  $lighthouse $url --perf --output=json > $out
  # Read the performance json file to get the aggregation value.
  total=`node -e "console.log(require('$out').aggregations[0].total)"`
}

## Compute the time that the control test lasts to configure the threshold for this system
runTest $controlTest
perfThreshold=`node -e "console.log($total * $controlMultiplier)"`
echo " >> lighthouse total=$total threshold=$perfThreshold test=$controlTest"
## Run tests and exit with status zero if all tests run in the expected limits
status=0
for i in $tests
do
  runTest $i
  # Read the performance file, and check if values are OK
  node -e "process.exit($total < $perfThreshold? 0: 1)" || status=1
  echo " >> lighthouse total=$total threshold=$perfThreshold test=$i status=$status"
done
exit $status
