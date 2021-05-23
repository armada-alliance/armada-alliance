const PromiseThrottle = { };

function HasNextGeneratorAdapter(generator) {
    this.generator = generator;
    this.val = this.generator.next();
}
HasNextGeneratorAdapter.prototype.next = function () {
    const ret = this.val.value;
    this.val = this.generator.next();
    return ret;
};
HasNextGeneratorAdapter.prototype.hasNext = function () {
    return this.val && this.val.done == false;
};

/**
 *
 * @param {*} sequence
 *      type: array
 *          array of parameters that pass in to promiseFunction
 *      type: generator function
 *          generator function of parameters that pass in to promiseFunction
 *      type: generator object
 *          generator of parameters that pass in to promiseFunction
 *
 * @param {*} promiseFunction
 *      type: function
 *          task execution function, pass in a parameter, returns a promise
 *
 * @param {*} throttle
 *      type: number
 *          throttle limit of concurrent executions
 */
PromiseThrottle.all = function (sequence, promiseFunction, throttle) {
    if(!PromiseThrottle.Promise){
        PromiseThrottle.Promise = Promise;
    }
    return new PromiseThrottle.Promise(function(resolve, reject){
        let generator;
        if (Array.isArray(sequence)) {
            generator = function* () {
                for (let i = 0; i < sequence.length; i++) yield sequence[i];
            }();
        } else if (sequence.constructor && sequence.constructor.name === 'GeneratorFunction') {
            // generator function
            generator = sequence();
        } else if (sequence.constructor && sequence.constructor.constructor && sequence.constructor.constructor.name === 'GeneratorFunction') {
            // generator object
            generator = sequence;
        }
        if (!generator) {
            throw new Error('Invalid Parameter Type: param');
        }
        generator = new HasNextGeneratorAdapter(generator);

        let index = 0;
        let startedTaskCount = 0;
        let endedTaskCount = 0;

        const onAllFinished = function () { return resolve(); };

        const onTaskReturns = function () {
            throttle++;
            endedTaskCount++;
        };

        let errorDisptached = false;
        const onError = function (err) {
            onTaskReturns();
            if(!errorDisptached){
                errorDisptached = true;
                return reject(err);
            }
        };

        const onTaskFinish = function () {
            onTaskReturns();
            if (generator.hasNext()) {
                return tryStartNewTask();
            }
            if (startedTaskCount <= endedTaskCount) {
                return onAllFinished();
            }
        };

        const tryStartNewTask = function () {
            while (throttle > 0 && generator.hasNext()) {
                throttle--;
                startedTaskCount++;
                promiseFunction(generator.next())
                    .then(() => onTaskFinish())
                    .catch(err => onError(err));
            }
            return;
        };
        return tryStartNewTask();
    });
};

PromiseThrottle.forEach = PromiseThrottle.all;

module.exports = PromiseThrottle;
