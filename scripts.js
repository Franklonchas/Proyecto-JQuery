var ListaPeliculas;
var win = $(window);
var contpage = 1;

function bucarPelicula() {
    $.ajax({
        url: "http://www.omdbapi.com/?s=" + $("#pelicula").val() + "&type=movie&apikey=e5e10b8a",
        success: function (result) {
            if (result.Response === 'True') {
                console.log(result, "ha ido bien");
                ListaPeliculas = result;
                addPelicula(ListaPeliculas);

            } else {
                console.log(result, "NO ha ido bien");
            }
        },
        error: function (result) {
            console.log(result, "NO ha ido bien");
        }
    });
}

function mostrarPeliculas() {
    for (let i = 0; i < ListaPeliculas.Search.length; i++) {
        console.log(ListaPeliculas.Search[i].Title);
    }
}

function addPelicula(ListaPeliculas) {
    for (let i = 0; i < ListaPeliculas.Search.length; i++) {
        $('#contenido').append('<div class="card col-lg-3 col-md-4 col-sm-6 col-xs-12 col-12" style="height: 350px; display: inline-flex;">\n' +
            '  <img class="card-img-top" style="height: 300px; width: 100%;" src="' + ListaPeliculas.Search[i].Poster
            + ' ">\n' +
            '  <div class="card-body">\n' +
            '    <a class="card-title">' + ListaPeliculas.Search[i].Title + '</a>\n' +
            '    <p class="card-text">Año: ' + ListaPeliculas.Search[i].Year + '</p>\n' +
            '</div>')
    }

    win.scroll(function () {
        if ($(document).height() - win.height() <= (win.scrollTop() + 80)) {
            contpage++;
            $.ajax({
                url: "http://www.omdbapi.com/?s=" + $('#pelicula').val() + "&type=movie&page=" + contpage + "&apikey=e5e10b8a",
                success: function (denuevo) {
                    addPelicula(denuevo);
                }
            });
        }
    });
}

