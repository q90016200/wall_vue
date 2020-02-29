<template>
    <div></div>
</template>




<script>

export default {
    name: 'fblogin',
    mounted: function () {

        window.fbAsyncInit = function() {
            window.FB.init({
                appId      : '567522667132320',
                cookie     : true,
                xfbml      : true,
                version    : 'v5.0'
            });
            
            window.FB.AppEvents.logPageView();   
            // eslint-disable-next-line no-console
            console.log('fbAsyncInit')
            
        };

        this.$nextTick(function () {
            // Get FB Login Status
            window.FB.getLoginStatus( response => {
                // eslint-disable-next-line no-console
                console.log(response)        // 這裡可以得到 fb 回傳的結果
            })
        });
    }
}
</script>