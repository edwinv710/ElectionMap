describe 'elections/show.html.erb' do

  it "should have a react dom for the election container" do
    assign(:election, create(:election, name: "Republican Primary"))

    render

    expect(rendered).to include('data-react-class="ElectionContainer"')
  end

end