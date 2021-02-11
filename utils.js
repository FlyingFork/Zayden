
module.exports = {
    firstLetter: function (str) {
        return str.charAt(0);
    },
    
    getWord: function (str, index) {
        return str.split(" ")[index || 0];
    },

    getWords: function (str) {
        return str.split(" ").length;
    },

    formatBytes: function (bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
    },

    trimArray(arr, maxLen = 10) {
        if(arr.length > maxLen) {
            const len = arr.length - maxLen;
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`);
        }
        return arr;
    }
}