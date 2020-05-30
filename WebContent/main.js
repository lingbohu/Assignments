$(document).ready(function() {
    
	$('#searchUser').on('keyup', function(e) {
        let username = e.target.value;

        $.ajax({
            url:'https://api.github.com/users/'+username
        }).done(function(user){
            
        	$.ajax({
                url:'https://api.github.com/users/'+username+'/repos'
            }).done(function(repos){
                $.each(repos, function(index, repo){

                    var userrepo =
                        `<div class="well">
                          <div class="row">
                            <div class="col-md-7">
                            <div class="alert alert-primary">
                              <h4 class="alert-heading">${repo.name}</h4>
                              <p class="mb-0">${repo.description}</p>
                            </div>
                            </div>
                            <div class="col-md-3">
                              <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
                              <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                              <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                            </div>
                            <div class="col-md-2">
                              <a href="${repo.html_url}" target="_blank" class="btn btn-light">Repo Page</a>
                            </div>
                          </div>
                        </div>`

                    $('#repos').append(userrepo);
                });
            });

            var userprofile =
                `<div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">${user.name}</h3>
                  </div>
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-3">
                        <img class="avatar" src="${user.avatar_url}"><br><br>
                        <a target="_blank" class="btn btn-light btn-block" href="${user.html_url}">View Profile</a>
                      </div>
                      <div class="col-md-9">
                      <span class="badge badge-danger">Public Repos: ${user.public_repos}</span>
                      <span class="badge badge-warning">Public Gists: ${user.public_gists}</span>
                      <span class="badge badge-info">Followers: ${user.followers}</span>
                      <span class="badge badge-dark">Following: ${user.following}</span>
                      <br><br>
                      <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        <li class="list-group-item">Member Since: ${user.created_at}</li>
                      </ul>
                      </div>
                    </div>
                  </div>
                </div><br>
                <h3 class="page-header">Latest Repos</h3>
                <div id="repos"></div>`

            $('#profile').html(userprofile);
        });
    });
});
