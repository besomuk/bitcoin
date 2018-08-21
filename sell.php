<html>
<head>
        <title>Bitcoin SELL</title>
        <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.0/build/pure-min.css">
	<link rel="stylesheet" href="css/style.css?<?php echo time(); ?>">

</head>
<body>
<div id="container">
    <div id="calculator">
        <img src="img/logo.jpg" />
        <form class="pure-form">
            <fieldset>
                <legend>
                    Bitcoin SELL
                </legend>
                <input type="text" placeholder="Amount in bitcoins" id="btc_amount">
                <button type="submit" class="pure-button pure-button-primary" id="submit_button_to_usd_sell">To dollars</button><br />
                <input type="text" placeholder="Amount in dollars" id="usd_amount">
                <button type="submit" class="pure-button pure-button-primary" id="submit_button_to_btc_sell">To bitcoins</button>
            </fieldset>
        </form>
    </div>
    <a href="index.php">Back</a>
</div>
</body>
<script src="js/jquery-3.1.1.min.js"></script>
<script src="js/zerowing.js?<?php echo time(); ?>"></script>
</div>
</body>
</html>
