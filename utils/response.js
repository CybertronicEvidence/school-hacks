

function wrappPayloadData(data) {

    // If data is an object or array, return like that
    // otherwise return wrapper

    if (typeof (data) === 'string') return {
        message: data,
    }


    return data;
}

const ResponseHandler = (res, data = null, error = null, status = null) => {

    const payload = {
        data,
        error,
        status_code: status || 200
    }

    // Check parameters
    if (error) {
        // Error should be string or object
        payload.data = null;
        payload.status_code = status || 400;

        // if error is object, send the object directly
        // since it is expected to be a custom object instead of error object
        if (typeof (error) === 'string') {
            payload.error = wrappPayloadData(error);
        }
        // otherwise return like that
    }
    else if (data) {
        payload.data = wrappPayloadData(data);
    }

    return res.status(payload.status_code).json(payload);
}


module.exports = ResponseHandler;