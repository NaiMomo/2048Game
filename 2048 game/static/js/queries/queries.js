 let tdScore = () => {

    let temp = document.getElementsByClassName('td_score');
    for(let i = 0; i<temp.length; i++ ){
        let tmp = document.getElementsByClassName('td_score')[i].innerHTML;
        if (tmp == '-1'){
            document.getElementsByClassName('td_score')[i].innerHTML = "Did not play"
        }
    }
 }

let yourBest = () => {
        //$("#global_best").text("XD");
        $(document).ready(function () {
            let myBestText = $("#your_best").val();
            $.ajax({
                method: 'POST',
                url: '/livesearch_myscore',
                data: {text: myBestText},
                success: function (res) {
                    console.log(res);
                    if (res === '-1') {
                        $("#your_best").text('-')
                    } else {
                        $("#your_best").text(res)
                    }
                }
            });
        })
}

    updateBest = (score) => {
    $(document).ready(function () {
        //score = $("#best_score").val();
        //window.alert(score);
       $.ajax({
            method: 'POST',
            url: '/update_best',
            data:{text:score},
           success:function(res){
                console.log(res +"res");
                $("#your_best").text(res)
            }
        });
    })
}


 queryScores = () => {
    // changer le score global
     $(document).ready(function() {
        //$("#global_best").text("XD");
        let globalText = $("#global_best").val();
        $.ajax({
            method:'POST',
            url: '/livesearch_global',
            data:{text:globalText},
            success:function(res){
                if (res === 'None'){
                    $("#global_best").text('-')
                }else{
                    console.log(res);
                $("#global_best").text(res)
                }
            }
        });
    })
}

let queryOnlineUsers = () => {
    $(document).ready(function() {
        let onlineText = $("#currentOnline").val();
        $.ajax({
            method:'POST',
            url: '/livesearch_online_users',
            data:{text:onlineText},
            success:function(res){
                $("#currentOnline").text(res)
            }
        });
    })
}

let queryAllDb = () => {
    $(document).ready(function() {
        let totalUsers = $("#totalUsers").val();
        $.ajax({
            method:'POST',
            url: '/livesearch_all_db',
            data:{text:totalUsers},
            success:function(res){
                console.log(res)
                $("#totalUsers").text(res)
            }
        });
    })
}


