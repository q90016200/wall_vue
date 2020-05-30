<template>
    <div class="posts mt-3">
        <b-container fluid>
            <!-- <h1>This is an posts page</h1> -->
            <div class="my-3 ">
                <div class="rounded bg-white">
                    <b-row class="my-3 ">
                        <div class="col-auto mt-3 ml-3">
                            <b-avatar class="mr-3"></b-avatar>
                            <span class="mr-auto">訪客</span>
                        </div>
                    </b-row>
                    <b-row class="my-3">
                        <div class="col-11 mt-3 ml-3">
                            <b-form-textarea
                                id="textarea-auto-height"
                                placeholder="Auto height textarea"
                                rows="3"
                                max-rows="8"
                            ></b-form-textarea>
                        </div>
                        
                    </b-row>
                    <b-row class="my-3 ">
                        <div class="col-md-3 offset-md-9">
                            <b-button variant="primary">發送</b-button>
                        </div>
                    </b-row>
                    <br>
                </div>

                <div class="my-3">
                    posts here
                </div>
            </div>
        </b-container>
        <br/><br/><br/>
    </div>
    
</template>
